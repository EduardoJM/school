import type { GetServerSideProps, NextPage } from 'next'
import { redirect } from 'next/dist/server/api-utils';
import { parseCookies } from 'nookies';
import { useAuth } from '../../hooks';
import { getAPIClient } from '../../services/inventare/APIClient';

const Dashboard: NextPage = ({ subjects }) => {
  const { userData } = useAuth();
  return (
    <>
      <h1>HELLO DASHBOARD!</h1>
      {userData && (
        <h4>{JSON.stringify(userData, null, 4)}</h4>
      )}
      <h5>{JSON.stringify(subjects, null, 4)}</h5>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { '@inventare_auth_token': token } = parseCookies(context);
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const apiClient = getAPIClient(context, 'http://admin:8000/api/v1');
  try {
    const subjects = await apiClient.get<any>('/subjects');
    return {
      props: {
        subjects: subjects.data,
      },
    }
  } catch(err) {
    return {
      notFound: true,
    }
  }
};

export default Dashboard;
