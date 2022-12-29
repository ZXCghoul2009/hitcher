import React, {useEffect, useState} from 'react';
import {SearchTripsForm} from "../../SearchForm/SearchTripsForm";
import {resetLocalStorage} from "../../../utils/helpers/localstorage/localstorage";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import {Trip} from "../../../utils/types/types";

export const SearchTripPage: React.FC = () => {
  const [trips, setTrips] = useLocalStorage<Trip[]>("trips", [])
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [fetchIsFinished, setFetchIsFinished] = useState<boolean>(false)


  useEffect(() => {
    window.addEventListener("beforeunload", resetLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", resetLocalStorage);
    };
  }, []);

  return (
      <>
        <SearchTripsForm setError={setError} setFetchIsFinished={setFetchIsFinished} setIsLoading={setIsLoading} setTrips={setTrips}/>
      </>
  );
};

