type Props = {
  name: string;
  icon: React.ReactNode;
};

export const ChatFeature: React.FC<Props> = ({ name, icon }) => {
  return (
    <div className="bg-blue-100 rounded-lg cursor-pointer py-6 px-3">
      <div className="w-fit mx-auto mb-2">{icon}</div>
      <p className="font-medium text-center text-black select-none">{name}</p>
    </div>
  );
};
