import Content from './IndexPage';
import BackgroundImg from './BackgroundImg';

export default function MainLayout({ children }) {

  return (
    <>
        <BackgroundImg />
        <Content>{children}</Content>
    </>
  );
}
