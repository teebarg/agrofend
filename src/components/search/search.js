import React, { useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Form from "react-bootstrap/Form";
import "./search.css";
import { Utility } from "../../util/utility";

const Search = ({ panTo, formik }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 6.524379, lng: () => 3.379206 },
      radius: 100 * 1000,
    },
  });

  useEffect(() => {
    setValue(formik.values.address);
    setTimeout(() => clearSuggestions(), 1000)
  }, []);

  const handleInput = (e) => {
    setValue(e.target.value);
    formik.handleChange(e);
    clearSuggestions();
  };

  const handleSelect = async (address) => {
    setValue(address, false);

    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const add = results[0].formatted_address;
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng, add });
    } catch (error) {
      Utility.showError();
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          name="address"
          placeholder="Search your location"
          autoComplete="off"
          className={
            "form-control " +
            (formik.touched.address && !!formik.errors.address
              ? "is-invalid"
              : "") +
            (formik.touched.address && !formik.errors.address ? "is-valid" : "")
          }
          onBlur={formik.handleBlur}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {formik.errors.address}
        </Form.Control.Feedback>
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Search;
