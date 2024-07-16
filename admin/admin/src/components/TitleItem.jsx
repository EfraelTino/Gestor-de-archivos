import { Link } from "react-router-dom";
export const TitleItem = ({ pageName }) => {
  return (
    <div className="mb-6 flex items-center gap-3 sm:flex-row sm:items-center justify-between">
      <h2 className="text-title-[16px] sm:text-title-xl2 font-semibold text-black">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-1">
          <li>
            <Link className="font-medium text-sm" to="/panel">
              Panel /
            </Link>
          </li>
          <li className="font-medium text-sm text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};
