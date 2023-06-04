import {
  Box,
  Button,
  CardContent,
  Grid,
  InputAdornment,
  Modal,
  Popover,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyInputField } from "../../utils/CurrencyInputField";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import HelpIcon from "@mui/icons-material/Help";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { grey, red } from "@mui/material/colors";
import zIndex from "@mui/material/styles/zIndex";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Calendar from "@mui/icons-material/Event";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { addTransaction } from "../../features/transactions/transactionSlice";
import * as firebase from "firebase/firestore";

const modalStyle = {
  position: "absolute",
  borderRadius: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

const scheme = yup.object({
  amount: yup.string().required("Amount is required"),
  category: yup.string().required("category is required"),
});

function AddTransaction({ transactionOpen, setTransactionOpen }) {
  const dispatch = useDispatch();
  const [categoryModal, setCategoryModal] = useState(false);
  const [formState, setFormState] = useState({
    account: "",
    amount: "",
    category: "",
    date: dayjs(Date.now()),
    is_expense: false,
    is_income: false,
    note: "",
    sub_category: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(scheme) });

  const categoryClose = () => {
    setTransactionOpen(false);
    resetForm();
  };

  // Function to reset value of form and validation value
  const resetForm = () => {
    setFormState({
      account: "",
      amount: "",
      category: "",
      date: dayjs(Date.now()),
      is_expense: false,
      is_income: false,
      note: "",
      sub_category: "",
    });
    reset({ date: "", amount: "", category: "", note: "" });
  };

  // Save
  const save = () => {
    dispatch(
      addTransaction({
        ...formState,
        date: firebase.Timestamp.fromDate(formState.date.toDate()),
        created_at: firebase.Timestamp.now(),
      })
    );
    resetForm();
    setTransactionOpen(false);
  };

  return (
    <>
      {/* CHOOSE CATEGORY */}
      <ChooseCategory
        categoryModal={categoryModal}
        setCategoryModal={setCategoryModal}
        formState={formState}
        setFormState={setFormState}
        style={modalStyle}
        setValue={setValue}
      />
      <Modal
        open={transactionOpen}
        onClose={categoryClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Transaction
          </Typography>
          <Stack sx={{ mt: 3 }} spacing={2}>
            <form
              onSubmit={handleSubmit(save)}
              style={{ display: "flex", flexDirection: "column", rowGap: 16 }}
            >
              <Box>
                <TextField
                  size="small"
                  fullWidth
                  name="category"
                  {...register("category", { required: true })}
                  placeholder="Uncategorized > Uncategorized"
                  value={
                    formState.sub_category
                      ? formState.category + " > " + formState.sub_category
                      : formState.category
                      ? formState.is_income
                        ? "Income" + " > " + formState.category
                        : "Expense" + " > " + formState.category
                      : ""
                  }
                  onClick={() => setCategoryModal(true)}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <HelpIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography role="alert" fontSize="small">
                  {errors.category?.message}{" "}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    orientation="landscape"
                    value={formState.date}
                    onChange={(newValue) =>
                      setFormState({ ...formState, date: newValue })
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        InputProps: {
                          startAdornment: (
                            <>
                              <InputAdornment position="start">
                                <Calendar />
                              </InputAdornment>
                            </>
                          ),
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  placeholder="Amount"
                  size="small"
                  name="amount"
                  fullWidth
                  value={formState.amount}
                  {...register("amount", { required: true })}
                  onChange={(e) =>
                    setFormState({ ...formState, amount: e.target.value })
                  }
                  InputProps={{
                    inputComponent: CurrencyInputField,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalAtmOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography role="alert" fontSize="small">
                  {errors.amount?.message}{" "}
                </Typography>
              </Box>

              <TextField
                placeholder="Note"
                size="small"
                name="note"
                value={formState.note}
                onChange={(e) =>
                  setFormState({ ...formState, note: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ArticleOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Button size="small" variant="contained" type="submit">
                Save
              </Button>
            </form>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

// MODAL CHOOSE CATEGORY
function ChooseCategory({
  categoryModal,
  setCategoryModal,
  formState,
  setFormState,
  setValue,
}) {
  const [tabValue, setTabValue] = useState(0);
  const [subCategoriOpen, setSubCategoriOpen] = useState(false);
  const [categoryItem, setcategoryItem] = useState();
  const categories = useSelector((state) => state.categories);

  const boxFef = useRef();

  const styleCategory = {
    position: "absolute",
    borderRadius: 2,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 2,
  };

  const handleCategoryClick = (params) => {
    setValue("category", params.category);

    if (params.sub_category) {
      setFormState({
        ...formState,
        category: params.category,
        sub_category: "Uncategorized",
        is_income: params.is_income,
        is_expense: params.is_expense,
      });
      setcategoryItem(params);
      setSubCategoriOpen(true);
    } else {
      setFormState({
        ...formState,
        category: params.category,
        sub_category: "",
        is_income: params.is_income,
        is_expense: params.is_expense,
      });
      setSubCategoriOpen(false);
      setCategoryModal(false);
    }
  };

  const handleSubCategoryClick = (sub_category) => {
    setFormState({ ...formState, sub_category: sub_category });
    setSubCategoriOpen(false);
    setCategoryModal(false);
  };

  return (
    <Modal
      open={categoryModal}
      onClose={() => setCategoryModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        {/* CATEGORY MODAL */}
        <Box sx={styleCategory} ref={boxFef}>
          <Tabs
            centered
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
          >
            <Tab label="Expense" />
            <Tab label="Income" />
          </Tabs>
          {!categories.isLoading && (
            <Box mt={2}>
              {!tabValue ? (
                <Grid container>
                  {categories.categories.map(
                    (category) =>
                      category.is_expense && (
                        <Grid
                          item
                          xs={2}
                          sx={{
                            width: "50%",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                          key={category.category}
                          onClick={() => handleCategoryClick(category)}
                        >
                          <Box
                            sx={{
                              bgcolor: grey[200],
                              display: "flex",
                              aspectRatio: 1 / 1,
                              justifyContent: "center",
                              alignItems: "center",
                              width: "70%",
                              borderRadius: 99,
                              mx: "auto",
                            }}
                          >
                            <ShoppingBasketOutlinedIcon />
                          </Box>
                          <Typography>{category.category}</Typography>
                        </Grid>
                      )
                  )}
                </Grid>
              ) : (
                <Grid container>
                  {categories.categories.map(
                    (category) =>
                      category.is_income && (
                        <Grid
                          item
                          xs={2}
                          key={category.category}
                          sx={{
                            width: "50%",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => handleCategoryClick(category)}
                        >
                          <Box
                            sx={{
                              bgcolor: grey[200],
                              display: "flex",
                              aspectRatio: 1 / 1,
                              justifyContent: "center",
                              alignItems: "center",
                              width: "70%",
                              borderRadius: 99,
                              mx: "auto",
                            }}
                          >
                            <ShoppingBasketOutlinedIcon />
                          </Box>
                          <Typography>{category.category}</Typography>
                        </Grid>
                      )
                  )}
                </Grid>
              )}
            </Box>
          )}
        </Box>

        {/* SUB CATEGORY POP OVER */}
        <Popover
          open={subCategoriOpen}
          anchorEl={boxFef.current}
          onClose={() => setSubCategoriOpen(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Box
            sx={{
              width: 400,
              height: 400,
              padding: 2,
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <Stack>
              <Stack direction="row" alignItems="center">
                <CloseIcon
                  sx={{ cursor: "pointer", color: red[600] }}
                  onClick={() => setSubCategoriOpen(false)}
                />
                <Typography sx={{ p: 2 }} variant={"h6"}>
                  {categoryItem?.category}
                </Typography>
              </Stack>
              <Stack>
                <Grid container>
                  {categoryItem?.sub_category.map((category, index) => (
                    <Grid
                      item
                      xs={2}
                      sx={{
                        width: "50%",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      key={zIndex}
                      onClick={() => handleSubCategoryClick(category)}
                    >
                      <Box
                        sx={{
                          bgcolor: grey[200],
                          display: "flex",
                          aspectRatio: 1 / 1,
                          justifyContent: "center",
                          alignItems: "center",
                          width: "70%",
                          borderRadius: 99,
                          mx: "auto",
                        }}
                      >
                        <ShoppingBasketOutlinedIcon />
                      </Box>
                      <Typography>{category}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Stack>
          </Box>
        </Popover>
      </>
    </Modal>
  );
}

export default AddTransaction;
