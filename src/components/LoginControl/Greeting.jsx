export default function Greeting({ isLogin }) {
  return !isLogin ? <p>Veuillez vous connecter</p> : <p>Bienvenue ! </p>;
}
