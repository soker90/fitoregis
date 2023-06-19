import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { queryBuilder } from 'lib/planetscale';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const {
      definicion,
      palabra
    } = req.body;

    if (!palabra)
      res.status(400).json({ message: 'La palabra es obligatoria' }).end();

    if (!definicion)
      res.status(400).json({ message: 'La definición es obligatoria' }).end();

    await queryBuilder
      .insertInto('diccionario')
      .values({
        definicion,
        palabra

      })
      .execute();
    return res.status(200).redirect(307, '/');
  } else {
    res
      .status(403)
      .json({
        message:
          'You must be sign in to view the protected content on this page.'
      })
      .end();
  }
};
