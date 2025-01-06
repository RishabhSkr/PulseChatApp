import {Helmet} from 'react-helmet-async';

export const Title = ({
  title = "Pulse Chat App",
  discription="Chat seamlessly with your friends and family"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="discription" content={discription} />
    </Helmet>
  )
}
export default Title;
