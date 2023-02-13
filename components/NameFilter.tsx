import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

import useDebounce from "../hooks/useDebounce";

type NameFilterProps = {
  filter: string;
  onChange: (name: string) => void;
}

function NameFilter({ filter, onChange }: NameFilterProps) {
  const [name, setName] = useState<string>(filter);

  const debouncedName = useDebounce(name, 300);

  useEffect(() => {
    onChange(debouncedName);
  }, [debouncedName]);

  return (
    <Input
      id="name-filter"
      type="search"
      placeholder="Filter by name"
      value={name}
      size="lg"
      onChange={e => setName(e.target.value)}
    />
  );
}

export default NameFilter;
