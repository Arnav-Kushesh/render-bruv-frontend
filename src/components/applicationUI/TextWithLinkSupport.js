const TextWithLinkSupport = ({ text }) => {
  // Regex to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Split text by URLs and rebuild with <a> tags
  const parts = text.split(urlRegex);

  return (
    <span>
      {parts.map((part, index) =>
        urlRegex.test(part) ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {part}
          </a>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};

export default TextWithLinkSupport;
