import {
  DeleteIcon,
  EmailIcon,
  HamburgerIcon,
  LockIcon,
  RepeatIcon,
  UnlockIcon,
} from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteAccount,
  disableAccount,
  enableAccount,
  resetPassword,
  sendVerificationEmail,
} from "../../../api/user.actions";

export const MoreUserAction = ({ user }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const showToast = (title) => {
    toast({
      title,
      status: "success",
      duration: 1000,
    });
  };

  const showError = (err) => {
    toast({
      title,
      status: "error",
      duration: 1000,
    });
  }
  const handleSendVerificationEmail = () => {
    dispatch(sendVerificationEmail(user.email));   
    showToast("Verification email sent");
  };

  const handlePasswordReset = () => {
    dispatch(resetPassword(user.email));
    showToast("Password reset email sent");
  };

  const handleDisableAccount = () => {
    dispatch(disableAccount(user.uid));
    showToast("Account disabled");
  };

  const handleEnableAccount = () => {
    dispatch(enableAccount(user.uid));
    showToast("Account enabled");
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccount(user.uid));
    showToast("Account deleted");
  };
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        {!user.emailVerified && (
          <MenuItem icon={<EmailIcon />} onClick={handleSendVerificationEmail}>
            Send Verification Email
          </MenuItem>
        )}

        <MenuItem icon={<RepeatIcon />} onClick={handlePasswordReset}>
          Reset Password
        </MenuItem>
        {!user.disabled ? (
          <MenuItem icon={<LockIcon />} onClick={handleDisableAccount}>
            Disable Account
          </MenuItem>
        ) : (
          <MenuItem icon={<UnlockIcon />} onClick={handleEnableAccount}>
            Enable Account
          </MenuItem>
        )}

        <MenuItem icon={<DeleteIcon />} onClick={handleDeleteAccount}>
          Delete Account
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
