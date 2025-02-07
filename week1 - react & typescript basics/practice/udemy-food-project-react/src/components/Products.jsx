import { useEffect, useState } from "react";
import useHttp from "../custom-hooks/UseHttp";
import Product from "./Product";
import { formatPrice, HTTP_CONFIGS } from "./utils/Utils";

export default function Products() {
  const { sent, data, error, httpCall } = useHttp();

  useEffect(() => {
    async function call() {
      await httpCall(HTTP_CONFIGS.GET_MEALS_PARAMS());
    }
    call();
  }, []);

  if (error)
    return <ul id="meals">Errore durante il recupero dei dati: {error}</ul>;

  if (sent && !data && !error) return <ul id="meals">Fetching data...</ul>;

  if (data)
    return (
      <ul id="meals">
        {data.map(
          (el) => (
            (el.formattedPrice = formatPrice(el.price)),
            (
              <li className="meal-item" key={el.id}>
                <Product meal={el} />
              </li>
            )
          )
        )}
      </ul>
    );
}
