import { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import api from "../api";

function Address({ setAdresa, setPunct_termic }) {
  const [addresses, setAddresses] = useState([]); // Address suggestions
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch matching addresses based on user input
  const fetchAddresses = useCallback((query) => {
    if (!query.trim()) {
      setAddresses([]);
      return;
    }

    setIsLoading(true);
    api.get(`/api/addresses?search=${query}`)
      .then(res => res.data)
      .then(data => setAddresses(data.map(address => ({
        value: address.id,
        label: address.name,
        region: { id: address.region_id, name: address.region_name }
      }))))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => fetchAddresses(searchQuery), 300); // Debounce API calls
    return () => clearTimeout(handler);
  }, [searchQuery, fetchAddresses]);

  return (
    <div className="flex flex-col gap-4 w-64">
      <label htmlFor="adresa">Adresa</label>
      <Select
        id="adresa"
        options={addresses}
        placeholder="Cauta Adresa"
        isLoading={isLoading}
        noOptionsMessage={() => "No addresses found"}
        onInputChange={(inputValue, { action }) => {
          if (action === "input-change") setSearchQuery(inputValue);
        }}
        onChange={(selected) => {
          setSelectedAddress(selected);
          setSelectedRegion(selected?.region || null);
          setAdresa(selected?.label || ""); 
          setPunct_termic(selected?.region?.name || ""); 
        }}
        isClearable
      />

      <label htmlFor="punct_termic">Punct Termic</label>
      <Select
        id="punct_termic"
        value={selectedRegion ? { value: selectedRegion.id, label: selectedRegion.name } : null}
        placeholder="Punct Termic"
        isDisabled={!selectedRegion}
      />
    </div>
  );
}

export default Address;
