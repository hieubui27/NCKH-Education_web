function NewsItem({ date, title }) {
  return (
    <div className="flex py-3 border-b border-gray-200">
      <div className="w-28 text-gray-400 text-sm">
        {date}
      </div>
      <div className="flex-1 cursor-pointer hover:text-blue-600">
        {title}
      </div>
    </div>
  );
}

export default NewsItem;