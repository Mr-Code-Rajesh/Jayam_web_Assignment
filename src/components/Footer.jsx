export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
      <p className="text-sm text-yellow-500">
        © {new Date().getFullYear()} Jayam Store — All Rights Reserved
      </p>
      <div className="flex justify-center gap-4 mt-2 text-gray-400 text-sm">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Support</a>
      </div>
    </footer>
  );
}
