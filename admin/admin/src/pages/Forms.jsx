import React, { useState } from "react";
import { TableForm } from "../components/Tables/TableForm";
import { SearchItem } from "../components/Button/SearchItem";
import { LinkComponent } from "../components/Button/LinkComponent";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TitleItem } from "../components/TitleItem";
import { CreateForm } from "../components/CreateForm";

export const Forms = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // APRENDAMOS A COMO PASAR PROPS Y DEVOLVER AL PADRE
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <>
      <TitleItem pageName="Formularios de podcast" />

      <div className="grid grid-cols-1 gap-1 md:grid-cols-1 md:gap-6 mt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-9">
          <div className="col-span-1">
            <SearchItem handleSearch={handleSearch} />
          </div>
          <CreateForm />
        </div>
        <TableForm dataSearch={searchTerm} />
      </div>
    </>
  );
};
