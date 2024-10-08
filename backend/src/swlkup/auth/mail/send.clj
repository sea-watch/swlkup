(ns swlkup.auth.mail.send
  (:require [postal.core :refer [send-message]]
            ; [swlkup.auth.mail.local.mailutils :refer [send-message]]
            [swlkup.config.state :refer [env]]))

; (defn send-message [_server msg] (println msg))

(defn send-mail' [msg* env]
  (let [server {:host (:mail-host env)
                :user (:mail-user env)
                :pass (:mail-pass env)
                :port (:mail-port env)
                :tls true}
        msg (assoc msg* :from (or (:mail-from env)
                                  (:mail-user-from env)))
        result (send-message server msg)]
       (or (= :SUCCESS (:error result))
           (= 0 (:exit result)))))

(defn send-mail [msg] (send-mail' msg env))
