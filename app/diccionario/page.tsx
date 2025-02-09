import { Card, Flex, Text, Title } from '@tremor/react';
import { queryBuilder } from 'lib/planetscale';

import NewButton from './new-button';
import DictionaryTable from './table';
import Search from '../search';

const dataFormatter = (number: number) =>
  Intl.NumberFormat('es').format(number).toString();

const DictionaryPage = async ({
                                searchParams
                              }: {
  searchParams: { q: string };
}) => {
  const search = searchParams.q ?? '';
  const dictionary = await queryBuilder
    .selectFrom('diccionario')
    .select(['id', 'palabra', 'definicion'])
    .where('palabra', 'like', `%${search}%`)
    .orderBy('palabra', 'asc')
    .execute();

  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <Flex>
        <div>
          <Title>Diccionario</Title>
          <Text>Definiciones de palabras del sector</Text>
        </div>
        <NewButton />
      </Flex>
      <Search />
      <Card className='mt-6'>
        {/* @ts-expect-error Server Component */}
        <DictionaryTable dictionary={dictionary} />
      </Card>
    </main>
  );
};

export default DictionaryPage;
