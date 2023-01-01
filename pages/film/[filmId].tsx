import Head from 'next/head';
import { useRouter } from 'next/router';

import { FilmDetail } from 'models/film-models';
import FilmDetailComponent from 'components/Pages/FilmDetail';

import withLayout from 'lib/withLayout';
import filmServices from 'services/film-services';
import { useEffect, useState } from 'react';
import { handlerMessage } from 'common/functions';

const Index = () => {
  const router = useRouter();
  const filmId = Number(router.query.filmId);
  console.log(filmId);
  console.log(router.query);

  const [filmDetail, setFilmDetail] = useState<FilmDetail>();

  useEffect(() => {
    const onFetchOrderFilmDetail = async () => {
      try {
        const resp = await filmServices.getDetail(filmId as number);

        if (!resp.error) {
          setFilmDetail(resp.content);
        }
      } catch (error) {
        handlerMessage('Order feedback not found', 'error');
      }
    };

    onFetchOrderFilmDetail();
  }, [filmId]);

  return (
    <>
      <Head>
        <title>Film</title>
      </Head>

      <FilmDetailComponent filmDetail={filmDetail} filmId={filmId} setFilmDetail={setFilmDetail} />
    </>
  );
};

export default withLayout(Index);
