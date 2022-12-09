import classnames from "classnames";

export function Star({ active, onClick }) {
  return (
    <svg
      width="164"
      height="164"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      aria-label={active ? "Remove Favorite" : "Add Favorite"}
      className={classnames("icon--star", {
        "icon--star--active": active,
        "icon--star--clickable": onClick,
      })}
      viewBox="0 0 164 164"
    >
      <g fill="none" fillRule="evenodd">
        <path
          d="M126.77 143.622l-9.394-50.128 37.065-35.031-50.577-6.556L82 5.832 60.136 51.907 9.56 58.463l37.065 35.031-9.395 50.128L82 119.197l44.77 24.425z"
          stroke="#000"
          strokeWidth="5"
          className="icon-star__shape"
        />
        {active ? (
          <path
            d="M65.954 82.126c0-1.87 1.147-3.186 3.696-3.186h22.26c2.506 0 3.653 1.317 3.653 3.186 0 1.912-1.147 3.356-3.653 3.356H69.65c-2.549 0-3.696-1.444-3.696-3.356z"
            fill="#000"
            fillRule="nonzero"
          />
        ) : (
          <path
            d="M84.43 96.75a2.483 2.483 0 0 1-2.496 2.496c-1.407 0-2.461-1.09-2.461-2.496V82.406H66.465c-1.406 0-2.496-1.09-2.496-2.46 0-1.407 1.09-2.532 2.496-2.532h13.008v-13.5c0-1.406 1.054-2.496 2.46-2.496a2.483 2.483 0 0 1 2.497 2.496v13.5h13.078c1.441 0 2.531 1.125 2.531 2.531 0 1.371-1.09 2.461-2.531 2.461H84.43V96.75z"
            fill="#000"
            fillRule="nonzero"
          />
        )}
      </g>
    </svg>
  );
}
