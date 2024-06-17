import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getPlayerProps } from "../../../../../../../lib/api";

// Define the function to fetch player props
export async function getServerSideProps({ params }: { params: Params }) {
  // Destructure sport and eventid from the params object
  const { sport, eventid } = params;

  // Fetch player props data using the provided sport and eventid
  const props = await getPlayerProps(sport, eventid);

  // Return the props object to be passed to the component
  return {
    props: {
      playerProps: props
    }
  };
}
