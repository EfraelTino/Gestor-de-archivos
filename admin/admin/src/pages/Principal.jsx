import { useState } from "react";
import { LinkComponent } from "../components/Button/LinkComponent";
import { SearchItem } from "../components/Button/SearchItem";
import { TableOne } from "../components/Tables/TableOne";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TitleItem } from "../components/TitleItem";

const Principal = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // APRENDAMOS A COMO PASAR PROPS Y DEVOLVER AL PADRE
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <TitleItem pageName="Todos los usuarios" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 2xl:gap-7.5 mt-3">
        <div className="grid grid-cols-1 gap-1 sm:gap-9 sm:grid-cols-2 items-center">
          <SearchItem handleSearch={handleSearch} />
          <LinkComponent
            content={"Agregar nuevo"}
            redirectItem="/panel/add-user"
            iconitem={<AiOutlineUsergroupAdd className="text-2xl" />}
          />
        </div>
        <TableOne dataSearch={searchTerm} />
      </div>
    </>
  );
};

export default Principal;
