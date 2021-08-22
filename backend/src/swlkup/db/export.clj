(ns swlkup.db.export
  (:require [clojure.pprint :refer [pprint]]
            [clojure.edn]))

(defn all_docs [db_ctx]
  (let [{:keys [sync q_unary]} db_ctx]
       (sync)
       (q_unary '{:find [(pull ?e [*])] :where [[?e :crux.db/id]]})))

(defn write-edn [file docs]
  (->> (with-out-str (pprint docs))
       (spit file)))

(defn export [file db_ctx]
  (->> (all_docs db_ctx)
       (write-edn file)))

(defn seed [file db_ctx]
  (let [{:keys [tx_sync]} db_ctx]
       (->> (clojure.edn/read-string (slurp file))
            (map (fn [entry] [:crux.tx/put entry]))
            tx_sync)))
