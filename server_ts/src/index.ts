import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import universitiesRoutes from './routes/universities';
import applicationsRoutes from './routes/applications';
import paymentsRoutes from './routes/payments';
import ticketsRoutes from './routes/tickets';
import auditRoutes from './routes/audit';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/universities', universitiesRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/audit', auditRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
