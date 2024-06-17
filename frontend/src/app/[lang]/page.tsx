import LangRedirect from './components/LangRedirect';
import { sectionRenderer } from './utils/section-renderer';
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";
import Odds from "./odds/page";
import Nav from "./nav";
export default async function RootRoute({ params }: { params: { lang: string } }) {
  try {
    const page = await getPageBySlug('home', params.lang);
    if (page.error && page.error.status == 401) {
      throw new Error(
        'Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/'
      );
    }

    if (page.data.length == 0 && params.lang !== 'en') {
      return <LangRedirect />;
    }

    if (page.data.length === 0) {
      return null;
    }

    const contentSections = page.data[0].attributes.contentSections;
    return (
      <main>
        {/* Render Nav component on top of the content */}
        {contentSections.map((section: any, index: number) =>
          sectionRenderer(section, index)
        )}
        {/* Render Odds component */}
        <Odds />
      </main>
    );
  } catch (error) {
    console.error('Error occurred:', error); // Log the error
    return null; // Return null if there's an error
  }
}
