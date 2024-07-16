import React, { useState } from "react";
import { SearchItem } from "../components/Button/SearchItem";
import { LinkComponent } from "../components/Button/LinkComponent";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TitleItem } from "../components/TitleItem";
import { TablePodcast } from "../components/Tables/TablePodcast";

export const Podcasts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // APRENDAMOS A COMO PASAR PROPS Y DEVOLVER AL PADRE
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <>
      <TitleItem pageName="Podcasts producidos" />

      <div className="grid grid-cols-1 gap-4  md:grid-cols-1 md:gap-6 mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-9">
          <SearchItem handleSearch={handleSearch} />
          <LinkComponent
          content={"Crear podcast"}
          redirectItem="/panel/new-episode"
          iconitem={<AiOutlineUsergroupAdd className="text-2xl" />}
        />
        </div>
        <TablePodcast dataSearch={searchTerm} />
      </div>
    </>
  );
};
