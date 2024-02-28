import AddEntity from "@/components/catalogue/AddEntity";
import EntityCard from "@/components/catalogue/EntityCard";
import Import from "@/components/catalogue/Import";
import { api } from "@/utils/api";

export default function Catalogue() {
  const { data } = api.catalogue.getEntities.useQuery();
  return (
    <>
      <div className="grid grid-cols-4 gap-4">{data?.map((x) => <EntityCard entity={x} key={x.id} />)}</div>
      <div>
        <AddEntity />
        <Import />
      </div>
    </>
  );
}
