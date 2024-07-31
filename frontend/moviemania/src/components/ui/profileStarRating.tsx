import React from 'react';

interface ProfileStarRatingProps {
  rating: number; // La note du film, de 0 à 5
}

const ProfileStarRating: React.FC<ProfileStarRatingProps> = ({ rating }) => {
  // Crée un tableau de 5 éléments, chaque élément est une étoile pleine ou vide
  const stars = Array.from({ length: 5 }, (_, index) => (
    <svg
      key={index}
      className={`w-3 h-3 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.176 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.34 9.397c-.784-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
    </svg>
  ));

  return <div className="flex">{stars}</div>;
};

export default ProfileStarRating;