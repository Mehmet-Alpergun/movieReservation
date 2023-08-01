const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const selected = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved");
fromLocalStorageToUI();
calculatePrice();

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected");
    calculatePrice();
  }
});
selected.addEventListener("change", function (e) {
  calculatePrice();
});
function calculatePrice() {
  const selectedSeats = container.querySelectorAll(".seat.selected");

  const selectedSeatsArr = [];
  const seatsArr = [];

  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });

  selectedSeats.forEach(function (selectedSeat) {
    selectedSeatsArr.push(selectedSeat);
  });

  let selectedSeatIndex = selectedSeatsArr.map(function (seatIndex) {
    return seatsArr.indexOf(seatIndex);
  });

  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * selected.value;

  savetoLocalStorage(selectedSeatIndex);
}
function savetoLocalStorage(indexes) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexes));
  localStorage.setItem("selectedMovie", selected.selectedIndex);
  // to get options name as string
  // localStorage.setItem(
  //   "selectedMovie",
  //   selected.options[selected.selectedIndex].innerText
  // );
}
function fromLocalStorageToUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovie");
  if (selectedMovieIndex != null) {
    selected.selectedIndex = selectedMovieIndex;
  }
}
