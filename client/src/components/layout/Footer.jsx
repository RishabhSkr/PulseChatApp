const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Made with <span className="text-red-500">❤️</span> by Rishabh Sonkar
        </p>
        <p className="text-xs text-gray-400 mt-1">
          © {new Date().getFullYear()} SwiftChat. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer