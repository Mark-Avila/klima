import { ref } from "vue";

const useGeoLocation = () => {
  const latitude = ref<number>(14.5995);
  const longitude = ref<number>(120.9842);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude.value = position.coords.latitude;
      longitude.value = position.coords.longitude;
    });
  }

  console.log(latitude.value + "\n" + longitude.value);

  return { latitude, longitude };
};

export default useGeoLocation;
