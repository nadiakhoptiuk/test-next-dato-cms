import Categories from 'components/Categories/Categories';
import Centers from 'components/Centers/Centers';
import Hero from 'views/Hero/Hero';
import Form from 'components/Form/Form';
import { gql } from 'graphql-request';
import { datoCmsRequest } from '@/lib/datocms';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const query = gql`
  query ($locale: SiteLocale) {
    banner {
      content
    }
    allCategories(locale: $locale) {
      title
      route
      range
      cardInfo {
        id
        description
        image {
          alt
          url
        }
      }
    }
    center(locale: $locale) {
      titleAtPage
      receptionCenter {
        city
        phoneNumber
        centerTitle
        address
        id
      }
    }
    footer(locale: $locale) {
      connectText
      additionalInfo {
        value
        links
        blocks
      }
    }
    help(locale: $locale) {
      route
      buttonText
      content {
        links
        blocks
        value
      }
    }
  }
`;

export const getStaticProps = async ({ locale }) => {
  const variables = { locale: locale };

  const data = await datoCmsRequest({ query, variables });

  console.log(data.footer);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      articles: data.allCategories,
      centers: data.center,
      banner: data.banner.content,
      help: data.help,
      footer: data.footer,
    },
  };
};

const Home = ({ articles, centers }) => {
  return (
    <>
      <Hero />

      <Form />

      <Categories articles={articles} />

      <Centers centers={centers} />
    </>
  );
};

export default Home;
