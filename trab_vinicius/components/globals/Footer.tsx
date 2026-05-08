export default function Footer() {
  return (
    <footer className="border-t py-6 mt-auto">
      <div className="container flex flex-col items-center justify-center mx-auto px-4">
        <p className="text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Sistema de Gestão de Currículos. Desenvolvido para fins acadêmicos.
        </p>
      </div>
    </footer>
  );
}