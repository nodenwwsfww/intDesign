const teamPhotoHandler = () => {
    const teamBlock = document.querySelector(".command>.container>.row");

    const changeTeamPhoto = event => {
        const target = event.target;

        if (target.classList.contains("command__photo")) {
            let copySrc = target.src;
            target.src = target.dataset.img;
            target.dataset.img = copySrc;
        }

    };
    teamBlock.addEventListener("mouseover", changeTeamPhoto);
    teamBlock.addEventListener("mouseout", changeTeamPhoto);
};
export default teamPhotoHandler;