import AddEntity from "@/components/catalogue/AddEntity";
import EntityCard from "@/components/catalogue/EntityCard";
import Import from "@/components/catalogue/Import";
import { api } from "@/utils/api";

export default function Catalogue() {
  const { data } = api.post.getEntities.useQuery();
  return (
    <>
      <>{data?.map((x) => <EntityCard entity={x} key={x.id} />)}</>
      <div>
        <AddEntity />
        <Import />
      </div>
    </>
  );
}
