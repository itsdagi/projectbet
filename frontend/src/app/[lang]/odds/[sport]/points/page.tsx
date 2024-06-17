import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Odds, getPointOdds } from "..../../../lib/api";
import OddsContainer from "@/app/[lang]/components/OddsContainer";
import OddsTable from "@/app/[lang]/components/OddsTable";
import Points from "@/app/[lang]/components/Points";

const Page = async ({ params }: { params: Params }) => {
  const { sport } = params;
  const league = sport.replaceAll("_", " ").toUpperCase();
  const odds = (await getPointOdds(sport)) as Odds[];

  if (!odds.length) {
    return <h2 className="text-3xl text-center">No Odds available!</h2>;
  }

  return (
    <OddsContainer hasOdds={!!odds} league={league}>
      {odds?.map((odd) => (
        <div key={odd.id}>
          <OddsTable
            key={odd.id}
            oddsItem={odd}
            points={<Points odd={odd} />}
          />
        </div>
      ))}
    </OddsContainer>
  );
};

export default Page;
