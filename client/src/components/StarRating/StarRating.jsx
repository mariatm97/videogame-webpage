import { FaStar } from 'react-icons/fa';
import style from './StarRating.module.css';

const StarRating = (props) => {
    const rating = props.rating;
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<FaStar key={i} className={style.star} />);
        } else if (i === fullStars && decimal >= 0.5) {
            stars.push(<FaStar key={i} className={style.star} />);
        } else {
            stars.push(<FaStar key={i} className={style.staro} />);
        }
    }

    return <div className={style.star}>{stars}</div>;
};
export default StarRating;