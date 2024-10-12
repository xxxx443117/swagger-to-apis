import { useState } from 'react';
import { Api } from './apis';
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PetInfo />
    </QueryClientProvider>
  );
}

function PetInfo() {
  const [petId, setPetId] = useState(1);
  // Queries
  const { data } = useQuery({
    queryKey: ['PetInfo', petId],
    queryFn: async () => Api.SwaggerV2Api.get_pet_petId(petId),
  });

  return (
    <div>
      <ul>
        <li>id: {data?.id || petId}</li>
        <li>name: {data?.name}</li>
        <li>status: {data?.status}</li>
        <li>photoUrls: {data?.photoUrls}</li>
      </ul>
      <button
        onClick={() => {
          setPetId((p) => p + 1);
        }}
      >
        Next Pet
      </button>
    </div>
  );
}

export default App;
