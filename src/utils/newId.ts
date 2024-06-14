const newID = (): string => {
  return new Date().getTime().toString();
};

export default newID;
