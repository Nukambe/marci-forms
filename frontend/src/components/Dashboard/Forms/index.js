import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getForms } from "../../../store/forms";
import {
  ChartPieIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DeleteModal from "../../Modal/DeleteModal";

export default function DashboardForms() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(null);
  const forms = useSelector((state) => state.forms.forms);

  useEffect(() => {
    dispatch(getForms());
  }, [dispatch]);

  useEffect(() => {
    if (open) return;
    setForm(null);
  }, [open]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-16">
        {forms?.map((form) => (
          <div
            key={form.id}
            className="bg-green-200 shadow sm:rounded-lg max-w-xl"
          >
            <div className="sm:p-6 flex items-center justify-between">
              <h3 className="text-base font-semibold leading-6 text-gray-900 text-ellipsis">
                {form.title}
              </h3>
              <div className="">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="sm:mt-0 sm:flex-shrink-0 flex items-center gap-x-2">
                    <Link
                      to={`/dashboard/forms/${form.id}/analytics`}
                      type="button"
                      className="inline-flex items-center rounded-md font-semibold text-green-900 ring-gray-300 hover:bg-green-100 p-2"
                    >
                      <ChartPieIcon className="w-6" />
                    </Link>
                    <Link
                      to={`/dashboard/forms/${form.id}/edit`}
                      type="button"
                      className="inline-flex items-center rounded-md font-semibold text-green-900 ring-gray-300 hover:bg-green-100 p-2"
                    >
                      <PencilSquareIcon className="w-6" />
                    </Link>
                  </div>
                  <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md font-semibold text-red-900 ring-gray-300 hover:bg-red-300 p-2"
                      onClick={() => {
                        setForm(form);
                        setOpen(true);
                      }}
                    >
                      <TrashIcon className="w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
      <DeleteModal open={open} setOpen={setOpen} form={form} />
    </>
  );
}
