import {Helmet} from 'react-helmet-async';

export const Title = ({
  title = "Chat App",
  discription="This is a chat app"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="discription" content={discription} />
    </Helmet>
  )
}
export default Title;
