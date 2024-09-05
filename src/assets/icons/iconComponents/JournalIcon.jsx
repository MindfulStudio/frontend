import JouranlIcon from "/src/assets/icons/diary-svgrepo-com.svg";

const JouranlIconComponent = ({ color = "#000" , ...props}) => {
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    {...props} // z.B. für Übergabe fill-color
  >
    <title>diary_line</title>
    <g
      id="页面-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g id="Education" transform="translate(-288.000000, 0.000000)">
        <g id="diary_line" transform="translate(288.000000, 0.000000)">
          <path
            d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
            id="MingCute"
            fill-rule="nonzero"
          ></path>
          <path
            d="M18,2 C19.0543909,2 19.9181678,2.81587733 19.9945144,3.85073759 L20,4 L20,20 C20,21.0543909 19.18415,21.9181678 18.1492661,21.9945144 L18,22 L6,22 C4.94563773,22 4.08183483,21.18415 4.00548573,20.1492661 L4,20 L4,19 C3.44772,19 3,18.5523 3,18 C3,17.48715 3.38604429,17.0644908 3.88337975,17.0067275 L4,17 L4,15 C3.44772,15 3,14.5523 3,14 C3,13.48715 3.38604429,13.0644908 3.88337975,13.0067275 L4,13 L4,11 C3.44772,11 3,10.5523 3,10 C3,9.48716857 3.38604429,9.06449347 3.88337975,9.0067278 L4,9 L4,7 C3.44772,7 3,6.55228 3,6 C3,5.48716857 3.38604429,5.06449347 3.88337975,5.0067278 L4,5 L4,4 C4,2.94563773 4.81587733,2.08183483 5.85073759,2.00548573 L6,2 L18,2 Z M18,4 L6,4 L6,20 L18,20 L18,4 Z M15.5,6 C16.2796706,6 16.9204457,6.59488554 16.9931332,7.35553954 L17,7.5 L17,9.5 C17,10.2796706 16.4050879,10.9204457 15.6444558,10.9931332 L15.5,11 L8.5,11 C7.72030118,11 7.079551,10.4050879 7.00686655,9.64445577 L7,9.5 L7,7.5 C7,6.72030118 7.59488554,6.079551 8.35553954,6.00686655 L8.5,6 L15.5,6 Z M15,8 L9,8 L9,9 L15,9 L15,8 Z"
            id="形状"
            fill={color}
          ></path>
        </g>
      </g>
    </g>
  </svg>;
};

export default JouranlIconComponent;