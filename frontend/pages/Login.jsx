const LoginPage = () => {
  return (
<div className='flex justify-end min-h-screen h-screen overflow-hidden bg-blue-800 bg-bg bg-blend-multiply bg-cover bg-center'>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 w-1/2 bg-slate-100 rounded-l-4xl">

        <div className="mb-8">
          <img src="/Martins.png" alt="Logo" className="w-60 h-auto mb-4" />
        </div>

        <div className="mb-14 text-center text-3xl text-blue-900 font-medium">
          Entre com uma conta
        </div>


        <input
          type="email"
          placeholder="Insira seu email aqui"
          className="placeholder:font-semibold placeholder:text-gray-700 placeholder:pl-6 w-2/4 h-14 p-3 mb-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 caret-transparent bg-slate-300"
        />


        <input
          type="password"
          placeholder="Insira sua senha aqui"
          className="placeholder:font-semibold placeholder:text-gray-700 placeholder:pl-6 h-14 w-2/4 p-3 mb-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 caret-transparent bg-slate-300"
        />


        <button className="w-2/4 h-20 py-3 bg-blue-800 text-white text-2xl font-semibold rounded-3xl hover:bg-blue-600 transition duration-200">
          Entrar
        </button>

        <div className="text-center mt-4">
          <a href="#" className="text-blue-800 hover:underline text-lg font-semibold">Esqueceu sua senha?</a>
        </div>
      </div>
      </div>
  );
};

export default LoginPage;
