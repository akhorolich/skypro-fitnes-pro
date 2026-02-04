import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProgressForm } from "./ProgressForm";

const exercises = [
  { name: "ex1", quantity: 5, _id: "e1" },
  { name: "ex2", quantity: 10, _id: "e2" },
];

describe("ProgressForm", () => {
  it("renders fields and validates max", async () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    render(
      <ProgressForm
        exercises={exercises}
        initialProgress={[1, 2]}
        onSubmit={onSubmit}
        onClose={onClose}
      />,
    );

    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs).toHaveLength(2);

    await userEvent.clear(inputs[0]);
    await userEvent.type(inputs[0], "99");
    await userEvent.click(screen.getByRole("button", { name: /Сохранить/i }));

    expect(onSubmit).not.toBeCalled();
    // after invalid input we should see error text
    expect(screen.getByText(/Не больше/)).toBeInTheDocument();
  });

  it("submits correct data", async () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    render(
      <ProgressForm
        exercises={exercises}
        initialProgress={[1, 2]}
        onSubmit={onSubmit}
        onClose={onClose}
      />,
    );

    const inputs = screen.getAllByRole("spinbutton");
    await userEvent.clear(inputs[0]);
    await userEvent.type(inputs[0], "3");
    await userEvent.click(screen.getByRole("button", { name: /Сохранить/i }));

    // wait for async submit
    expect(onSubmit).toBeCalledWith([3, 2]);
  });
});
