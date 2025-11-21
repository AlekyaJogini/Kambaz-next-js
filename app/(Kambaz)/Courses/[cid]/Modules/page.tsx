"use client";
import { useState, useEffect} from "react";
import { useParams } from "next/navigation";
import * as coursesClient from "../../client";
//import * as modulesClient from "./client";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  setModules,
  addModule,
  deleteModule,
  updateModule as updateModuleAction,
  editModule,
} from "./reducer";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

   const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };


   // ✅ ADD: Create module handler
  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const createdModule = await coursesClient.createModuleForCourse(cid as string, newModule);
    dispatch(addModule(createdModule));  // ✅ Add the module from server response
    setModuleName("");  // ✅ Clear the input field
  };

   const removeModule = async (moduleId: string) => {
    await coursesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));  // ✅ Use reducer action to remove from state
  };

  const saveModule = async (module: any) => {
    await coursesClient.updateModule(module);
    dispatch(updateModuleAction(module));
  };

   useEffect(() => {
    fetchModules();
  }, [cid]); 
  



  return (
    <div className="wd-modules">
      {/* Toolbar */}
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule= {createModuleForCourse}
      />

      {/* Module List */}
      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: any) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary text-white d-flex align-items-center justify-content-between">
                <div>
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}

                  {module.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      value={module.name}
                      onChange={(e) =>
                        dispatch(
                          updateModuleAction({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          
                            saveModule({ ...module, editing: false });
                          
                        }
                      }}
                      
                    />
                  )}
                </div>

                {/* ✅ Buttons now use Redux actions */}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => removeModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
