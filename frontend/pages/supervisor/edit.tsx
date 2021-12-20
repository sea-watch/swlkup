import { useEffect } from 'react'
import { Login, useAuthStore, AuthState } from '../../components/Login'
import { useSupervisorGetQuery, Offers, SupervisorInput} from '../../codegen/generates'
import { fetcher } from '../../codegen/fetcher'
import { useTranslation, Trans } from 'react-i18next';
import constants from '../../i18n/const.json'
import { sort } from '../../components/LanguageSelection'

function filter_empty_vals(map: object) {
  return Object.fromEntries(Object.entries(map).filter(kv => kv[1]))
}

function has_errors(error_map: object|undefined) {
  return error_map && Object.entries(error_map).length
}

function setCustomValidity(error_map:object) {
  for(const [name, error] of Object.entries(error_map)) {
    const el = (document.getElementsByName(name)[0] as HTMLInputElement)
    el?.setCustomValidity(error)
  }
}

function jump_top() {
  location.href = '#'
}

function validate() {
  const form = document.getElementById('supervisor_form') as HTMLFormElement
  const formData = form && new FormData(form)
  const formObject = form && Object.fromEntries(formData)
  const formArray = form && Array.from(formData)
  const supervisor = {'name_full': formObject?.name_full,
	              'text_specialization': formObject?.text_specialization,
                      'text': formObject?.text,
                      'contacts': {'phone': formObject?.phone,
				   'email': formObject?.email,
			           'website': formObject?.website},
		      'location': {'zip': formObject?.zip},
                      'languages': formArray?.filter(x => x[0] == 'language').map(x => x[1]),
                      'offers': formArray?.filter(x => x[0] == 'offer').map(x => x[1]),
                      'ngos': formObject?.all_ngos === 'true' ? 'any' : formArray?.filter(x => x[0] == 'ngos').map(x => x[1])}

  const errors = {email: supervisor.contacts.phone || supervisor.contacts.email ? '' : 'Please provide a phone number or an email address.',
                  language: supervisor.languages?.length ? '' : 'Please select at least one language.',
                  offer: supervisor.offers?.length ? '' : 'Please select at least one offer.',
                  all_ngos: supervisor.ngos?.length ? '' : 'Please select the ngos you want support or choose the option `Àny`.'}

  setCustomValidity(errors)

  const errors_filtered = filter_empty_vals(errors)
  const result = !has_errors(errors_filtered)
		 ? {data: {supervisor}}
	         : {data: {supervisor},
	            errors: filter_empty_vals(errors)}
  //form && console.log(result)
  return result
}

async function mutate(auth: AuthState, supervisor: SupervisorInput) {
  const result = await fetcher<any, any>(`mutation update($auth: Auth, $supervisor: SupervisorInput) {
                                            supervisor_update(auth: $auth, supervisor_input: $supervisor) }`,
                                         {auth, supervisor})()
  //console.debug(result)
  return result.supervisor_update
}

function offer_options(offers: Offers[], supervisor: any) {
  return offers.map( offer => (
          <label key={offer.id}>
            <input type="checkbox" name="offer" value={offer.id} id={offer.id} defaultChecked={supervisor?.offers.includes(offer.id)} onChange={validate} />
            <Trans i18nKey={offer.id as string}/><br/>
          </label>
        ))
}

export default function SupervisorEdit() {
  const {t} = useTranslation()
  const auth = useAuthStore()
  useEffect(() => {
    auth.setJwt(localStorage.getItem('jwt') || '')
  }, [auth.jwt])

  const {data, remove, refetch} = useSupervisorGetQuery({auth}, {enabled: Boolean(auth.jwt)})
  const supervisor = data?.supervisor_get

  useEffect(() => {
    /** When the mutation was successfull, we want check the new data from the db,
        so we refetch the data and then reset the form.
        After resetting, we see the new defaultValues. **/
    (document.getElementById('supervisor_form') as HTMLFormElement)?.reset()
    validate()
  }, [supervisor])

  const default_any_ngo = Boolean(!supervisor || supervisor.ngos === 'any')

  return (
    <>
      <Login />
      <div>
        <Trans i18nKey="introduction_supervisor" values={constants}>text <a href={constants.url_privacy_policy}>privacy_policy</a></Trans>
      </div>
      <br/><br/>

      { data && data.ngos && <>
        <form onSubmit={ async event => { event.preventDefault()
		                          const {data, errors} = validate()
		                          remove()  /** we want delete the cache between calculation based on this data and mutation **/
					  !has_errors(errors)
					  && await mutate(auth, (data.supervisor as any))
					  && refetch()
	                                  && jump_top() }
                       } id="supervisor_form">
  
          <fieldset>
            <legend>{ t('For which ngos are you offering your services?') }</legend>
  	    <table><tbody>
  	      <tr>
	        <td>
		  <label>
                    <input type="radio" name="all_ngos" value="true" defaultChecked={default_any_ngo} onChange={validate} onClick={validate}/>
		    { t('Any') }
		  </label>
		</td>
		<td></td>
  	      </tr>
  	      <tr>
	        <td>
		  <label>
                    <input type="radio" name="all_ngos" value="false" defaultChecked={!default_any_ngo} id="all_ngos_false" onChange={validate} onClick={validate}/>
		    { t('Only this explicitly selected') }
                  </label>
                </td>
  	        <td>
  	          {data.ngos.map(ngo => { return (
  		    <label key={ngo.id as string}>
                      <input type="checkbox" name="ngos" value={ngo.id as string}
		             defaultChecked={typeof(supervisor?.ngos) === 'object' && supervisor?.ngos.includes(ngo.id)}
			     onClick={() => { (document.getElementById('all_ngos_false') as HTMLInputElement).checked = true }}
                             onChange={validate}/>
                      {ngo.name}<br/>
                    </label>
  	          )})}
		</td>
	      </tr>
  	    </tbody></table>
          </fieldset><br/>

          <fieldset>
            <legend>{ t('Languages you speak') }</legend>
            { sort(data.languages).map( lang => (
              <label key={lang.id}>
                <input type="checkbox" name="language" value={lang.id} id={lang.id} defaultChecked={supervisor?.languages.includes(lang.id)} onChange={validate} />
                <img key={lang.id} src={lang.flag_url} title={lang.name} style={{height: "15px"}}/>&nbsp;
	        <span className="bidi-isolate">{lang.name}</span>&nbsp;
              </label>
            ) ) }
          </fieldset><br/>
  
          <fieldset>
            <legend>{ t('What kind of offers are you providing?') }</legend>
            <table><tbody>
	      <tr>
	        <td>{ t('For individuals') }</td>
                <td>{ offer_options(data.offers.filter(offer => offer.target === 'individual'), supervisor) }</td>
	      </tr>
	      <tr>
                <td>{ t('For groups') }</td>
                <td>{ offer_options(data.offers.filter(offer => offer.target === 'group'), supervisor) }</td>
	      </tr>
	    </tbody></table>
          </fieldset><br/>
  
          <fieldset>
            <legend>{ t('General information') }</legend>
	    <table><tbody>
	      <tr>
	        <td>{ t('Name') }</td>
                <td><input type="text" name="name_full" defaultValue={supervisor?.name_full || undefined} required={true}/></td>
	      </tr>
	      <tr>
		<td>{ t('Specialization') }</td>
                <td><input type="text" name="text_specialization" defaultValue={supervisor?.text_specialization || undefined} required={true}/></td>
	      </tr>
              <tr>
	        <td>{ t('Motivation') }</td>
                <td><textarea name="text" defaultValue={supervisor?.text || undefined} rows={4} required={true}/></td>
              </tr>
	    </tbody></table>
          </fieldset><br/>
  
          <fieldset>
            <legend><Trans i18nKey="Contact information (phone or email)">Contact information <i>(phone or email)</i></Trans></legend>
	    <table><tbody>
              <tr>
	        <td>{ t('Phone') }</td>
                <td><input type="text" name="phone" defaultValue={supervisor?.contacts.phone || undefined} onChange={validate}/></td>
	      </tr>
              <tr>
                <td>{ t('Email') }</td>
                <td><input type="text" name="email" defaultValue={supervisor?.contacts.email || undefined} onChange={validate}/></td>
              </tr>
              <tr>
	        <td>{ t('Website') }<br/><i>({ t('optional') })</i></td>
                <td><input type="text" name="website" defaultValue={supervisor?.contacts.website || undefined}/></td>
	      </tr>
            </tbody></table>
          </fieldset><br/>
  
          <fieldset>
            <legend>{ t('Location') }</legend>
	    <table><tbody>
	      <tr>
                <td>{ t('Zip code') }<br/><i>({ t('optional') })</i></td>
                <td><input type="text" name="zip" defaultValue={supervisor?.location.zip || undefined}/></td>
	      </tr>
	    </tbody></table>
          </fieldset><br/>

          <div style={{textAlign: "right"}}>
            <input type="submit" value={ t('Save and Publish') as string }/>
	  </div>
        </form>
      </> }
    </>
  )
}
