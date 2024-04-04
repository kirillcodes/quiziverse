import React, { useState } from "react";
import scss from "@styles/pages/Profile.module.scss";
import { useChangePasswordMutation, useGetProfileQuery } from "@store/api/usersApi";
import { Container, CustomButton, CustomInput, Modal } from "@components";

export const Profile: React.FC = () => {
  const { data: profileData, isLoading } = useGetProfileQuery({});
  const [changePassword, { isLoading: isChangingPassword, isSuccess: isSuccessChanged }] =
    useChangePasswordMutation();
  const [newPassword, setNewPassword] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const [isModal, setIsModal] = useState(false);

  if (isLoading || !profileData) return <div>Loading...</div>;

  const { username, email, role } = profileData;

  const handlePreviousPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreviousPassword(event.target.value);
  };

  const handleNewPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async () => {
    await changePassword({ previousPassword, newPassword }).unwrap();
  };

  const toggleModal = () => {
    setIsModal((prev) => !prev);
    setPreviousPassword("");
    setNewPassword("");
  };

  if (isModal)
    return (
      <Modal handleModal={toggleModal} style={{ width: "100%" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.2rem" }}>Change password</h2>
        {!isSuccessChanged ? (
          <>
            <div style={{ margin: "20px 0" }}>
              <h3 style={{ marginBottom: 5 }}>Old password</h3>
              <CustomInput
                type="password"
                handleInput={handlePreviousPasswordInput}
                value={previousPassword}
              />
              <h3 style={{ marginTop: 10, marginBottom: 5 }}>New password</h3>
              <CustomInput
                type="password"
                handleInput={handleNewPasswordInput}
                value={newPassword}
              />
            </div>
            <CustomButton
              title="Change password"
              handleSubmit={handleSubmit}
              disabled={isChangingPassword || !previousPassword || !newPassword}
            />
          </>
        ) : (
          <>
            <h3 style={{ textAlign: "center", marginTop: 20 }}>
              The password was successfully changed!
            </h3>
          </>
        )}
      </Modal>
    );

  return (
    <Container>
      <div className={scss.profile}>
        <div className={scss.innerBlock}>
          <h2>[ Profile ]</h2>
          <div className={scss.info}>
            <div className={scss.username}>
              <p>{username}</p>
              <p>{role}</p>
            </div>
            <p>{email}</p>
            <CustomButton title="Change password" handleSubmit={toggleModal} />
          </div>
        </div>
      </div>
    </Container>
  );
};
