
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // In a real app, this would send a recovery email
    // For this demo, we'll just show a success message if the email is correct
    if (email === 'mykael.mcarvalho@gmail.com') {
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
        toast({
          title: "E-mail enviado",
          description: "Instruções de recuperação foram enviadas para seu e-mail",
        });
      }, 1500);
    } else {
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "E-mail não encontrado",
          description: "Não encontramos uma conta com este e-mail",
          variant: "destructive",
        });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-brandPurple">
          Recuperar Senha
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enviaremos instruções para redefinir sua senha
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!submitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brandPurple focus:border-brandPurple"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-brandYellow bg-brandPurple hover:bg-brandPurpleLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandPurple disabled:opacity-50"
                >
                  {loading ? 'Enviando...' : 'Enviar instruções'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="mb-4 text-green-600">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-medium">E-mail enviado!</p>
              <p className="mt-2 text-sm text-gray-600">
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </p>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link
              to="/admin"
              className="text-sm font-medium text-brandPurple hover:text-brandPurpleLight"
            >
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
