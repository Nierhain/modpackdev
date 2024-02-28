import AddEntity from "@/components/catalogue/AddEntity";
import EntityCard from "@/components/catalogue/EntityCard";
import Import from "@/components/catalogue/Import";
import { api } from "@/utils/api";

export default function Catalogue() {
  const { isLoading, isError, data } = api.post.getEntities.useQuery();
  return (
    <>
      <>{data?.map((x) => <EntityCard entity={x} />)}</>
      <div>
        <AddEntity />
        <Import />
      </div>
    </>
  );
}
