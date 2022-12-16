const regex = {
  usernameFormat: /^([a-z0-9]|[-._](?![-._])){4,20}$/,
  passwordFormat: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/,
};

export default regex;
