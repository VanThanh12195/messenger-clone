export default function getRandomUserImageUrl() {
    // Randomly select a gender ('men' or 'women')
    const gender = Math.random() < 0.5 ? 'men' : 'women';
  
    // Generate a random index between 2 and 98 (inclusive)
    const randomIndex = Math.floor(Math.random() * 97) + 2;
  
    // Construct the URL
    const imageUrl = `https://randomuser.me/api/portraits/${gender}/${randomIndex}.jpg`;
  
    return imageUrl;
  }
  