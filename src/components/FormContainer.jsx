import React from 'react';

const FormContainer = ({ title, description, children, onSubmit }) => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">{description}</p>
        <form onSubmit={(event)=>onSubmit(event)} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          {children}
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
